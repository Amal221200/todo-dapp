/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, TodoABI } from "../blockchain/constants";
import { useCallback } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../blockchain/config";
import toast from "react-hot-toast";

export default function () {
    const { address } = useAccount()
    const { refetch } = useReadContract({ abi: TodoABI, address: CONTRACT_ADDRESS, functionName: "getTodos", args: [], account: address })
    const { writeContractAsync } = useWriteContract()

    const updateTodo = useCallback(async (id: number) => {
        try {

            const hash = await writeContractAsync({ abi: TodoABI, address: CONTRACT_ADDRESS, functionName: "completedTodo", args: [id] })
            await toast.promise(waitForTransactionReceipt(config, {
                hash,
                pollingInterval: 1000,
            }), { success: "Todo Updated", loading: "Running Your Transaction", error: "Something went wrong" })
            await refetch()
        } catch (error: any) {
            if (error?.message?.includes('User rejected')) {
                toast.error("You cancelled the transaction")
            }
        }
    }, [writeContractAsync, refetch])

    const deleteTodo = useCallback(async (id: number) => {
        try {
            const hash = await writeContractAsync({ abi: TodoABI, address: CONTRACT_ADDRESS, functionName: "deleteTodo", args: [id] })
            await toast.promise(waitForTransactionReceipt(config, {
                hash,
                pollingInterval: 1000,
            }), { success: "Todo Deleted", loading: "Running Your Transaction", error: "Something went wrong" })
            await refetch()
        } catch (error: any) {
            if (error?.message?.includes('User rejected')) {
                toast.error("You cancelled the transaction")
            }
        }
    }, [writeContractAsync, refetch])

    const createTodo = useCallback(async (task: string) => {
        try {
            const hash = await writeContractAsync({ abi: TodoABI, address: CONTRACT_ADDRESS, functionName: "addTodo", args: [task] })
            await toast.promise(waitForTransactionReceipt(config, {
                hash,
                pollingInterval: 1000,
            }), { success: "Todo Created", loading: "Running Your Transaction", error: "Something went wrong" })
            await refetch()
        } catch (error: any) {
            if (error?.message?.includes('User rejected')) {
                toast.error("You cancelled the transaction")
            }
        }
    }, [writeContractAsync, refetch])


    return {
        updateTodo,
        createTodo,
        deleteTodo
    }
}