/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";
import axios from "../lib/axios.config";
import useAuth from "./useAuth";


export default function useProducts() {
    const toast = useToast();
    const router = useRouter();
    const { user } = useAuth();
    const [creatingProduct, setCreatingProduct] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);
    const [updatingProduct, setUpdatingProduct] = useState(false);

    const { data: products, isLoading, error, mutate } = useSWR("/products", async (url) => {
        if (!user) return;
        const { data } = await axios.get(url);
        return data.products;
    });

    useEffect(() => {
        mutate();
    }, [user])

    const createProduct = async (product, redirect=false) => {
        setCreatingProduct(true);
        try {
            const { data } = await axios.post("/products", product);
            if (data.success) {
                toast.show("Product created successfully", {
                    type: 'success'
                });
                mutate([...products || [], data.product]);
                if (redirect) {
                    router.push(`/home`);
                }
            } else {
                toast.show("An error occurred", {
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error(error);
            toast.show("An error occurred", {
                type: 'danger'
            });
        } finally {
            setCreatingProduct(false);
        }
    }

    const deleteProduct = async (id, redirect=false) => {
        setDeletingProduct(true);
        try {
            const { data } = await axios.delete(`/products/${id}`);
            if (data.success) {
                toast.show("Product deleted successfully", {
                    type: 'success'
                });
                mutate(products?.filter(product => product.id !== id));
                if (redirect) {
                    router.push(`/home`);
                }
            } else {
                toast.show("An error occurred", {
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error(error);
            toast.show("An error occurred", {
                type: 'danger'
            });
        } finally {
            setDeletingProduct(false);
        }
    }

    const updateProduct = async (product, redirect=false) => {
        setUpdatingProduct(true);
        try {
            const { data } = await axios.put(`/products/${product.id}`, product);
            if (data.success) {
                toast.show("Product updated successfully", {
                    type: 'success'
                });
                mutate(products?.map(p => p.id === product.id ? product : p));
                if (redirect) {
                    router.push(`/home`);
                }
            } else {
                toast.show("An error occurred", {
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error(error);
            toast.show("An error occurred", {
                type: 'danger'
            });
        } finally {
            setUpdatingProduct(false);
        }
    }

    return {
        products,
        isLoading,
        error,
        createProduct,
        deleteProduct,
        updateProduct,
        creatingProduct,
        deletingProduct,
        updatingProduct
    }

}