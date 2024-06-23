import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import useProducts from '../../hooks/useProducts';
import Ioicons from '@expo/vector-icons/Ionicons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const ProductView = () => {
    const toast = useToast();
    const pathname = usePathname();
    const { products, updateProduct, updatingProduct, deleteProduct, deletingProduct } = useProducts();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0
    });

    useEffect(() => {
        if (pathname) {
            const id = pathname.split('/')[2];
            const product = products?.find((p) => p.id === id);
            if (product) {
                setProduct(product);
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price
                });
            }
        }
    }, [pathname]);

    const handleSubmit = () => {
        if (!formData.name || !formData.description || !formData.price) {
            return toast.show("Please fill in all fields", {
                type: 'danger'
            });
        }
        if (formData.price < 1) {
            return toast.show("Price must be greater than 0", {
                type: 'danger'
            });
        }
        // check if something changed
        if (formData.name === product?.name && formData.description === product?.description && formData.price === product?.price) {
            return toast.show("No changes detected", {
                type: 'info'
            });
        }
        updateProduct({
            ...formData,
            id: product?.id
        }, true);

    }

    if (!product) return null
    return (
        <SafeAreaView className='bg-white h-full p-3'>
            <View className='flex-row justify-between' >
                <TouchableOpacity
                    onPress={() => router.push('/home')}
                    className='flex-row items-center h-fit'>
                    <Ioicons name='arrow-back' size={24} />
                    <Text>Back to products</Text>
                </TouchableOpacity>
                <CustomButton
                    isLoading={deletingProduct}
                    handlePress={() => deleteProduct(product.id, true)}
                    title='Delete'
                    variant='outline'
                    titleStyles='text-red-500'
                    containerStyles='border-red-500 w-32 py-1'
                />
            </View >
            <View className='mt-6'>
                <Text className='text-xl font-rubiksemibold text-gray-800'>Product Details</Text>
                <View className='mb-5 mt-4'>
                    <CustomInput
                        value={formData.name}
                        label='Product Name'
                        placeholder='Enter product name'
                        onChangeText={(val) => setFormData({ ...formData, name: val })}
                    />
                    <CustomInput
                        value={formData.description}
                        label='Description'
                        placeholder='Enter product description'
                        onChangeText={(val) => setFormData({ ...formData, description: val })}
                        multiline
                        numberOfLines={4}
                        containerStyles='mt-3'
                    />
                    <CustomInput
                        value={formData.price.toString() === 'NaN' ? '' : formData.price.toString()}
                        label='Price (in USD)'
                        placeholder='Enter product price'
                        onChangeText={(val) => setFormData({ ...formData, price: parseInt(val) })}
                        keyboardType='numeric'
                        containerStyles='mt-3'

                    />
                </View>
                <CustomButton
                    isLoading={updatingProduct}
                    title='Update Product'
                    handlePress={handleSubmit}
                    containerStyles='mt-8'
                />
            </View>
        </SafeAreaView>
    )
}

export default ProductView