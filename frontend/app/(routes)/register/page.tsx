"use client"
import { RegisterApi } from '../../Apis/RequestAPI';
import { ArrowLeft, Eye, EyeOff, Leaf, UserRoundPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
interface registerData {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

function Register() {
    const [formData, setFormData] = useState<registerData>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    //POST function 
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!formData) return false;

        const payLoad = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
        }
        try {
            const res = await RegisterApi("/v1/register", payLoad);
            if (res?.status === 200) {
                toast.success("Register successfully");
                setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                });
                router.push("/login")
            } else {
                toast.error(res?.data.message)
            }
        } catch (error: any) {
            console.log("Error from function", error.message)
        }
    }


    return (
        <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-800 dark:text-white shadow-md hover:shadow-lg transition duration-200 absolute top-4 left-4 cursor-pointer"
            >
                <ArrowLeft size={18} />
            </button>
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Illustration Panel */}
                <div className="hidden lg:flex flex-col items-center justify-center p-4 lg:p-8">
                    <div className="relative">
                        <div className="w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-emerald-400 to-purple-500 rounded-full opacity-20 absolute -top-8 -left-8 lg:-top-10 lg:-left-10"></div>
                        <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-purple-400 to-emerald-500 rounded-full opacity-30 absolute top-8 left-8 lg:top-10 lg:left-10"></div>
                        <div className="relative z-10 text-center">
                            <Leaf className="h-16 w-16 lg:h-24 lg:w-24 text-emerald-500 mx-auto mb-4 lg:mb-6" />
                            <h1 className="text-3xl text-white lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
                                Arvyax Wellness
                            </h1>
                            <p className="text-base lg:text-lg text-white dark:text-gray-300 leading-relaxed px-4">
                                Create, share, and discover wellness sessions that nurture your mind, body, and soul.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Panel */}
                <main
                    className="w-full max-w-md mx-auto px-4 sm:px-4 "
                >

                    <h1 className="text-4xl flex items-center justify-center font-extrabold sm:mb-10 mb-4 sm:mt-2 mt-16 text-white text-center"> Register</h1>
                    <div className="max-w-xl lg:max-w-3xl">
                        <form
                            className="mt-8 grid grid-cols-6 gap-6">

                            <div className="col-span-6 sm:col-span-3">

                                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    id="FirstName"
                                    name="firstname"
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md border-gray-200 p-2 outline-none bg-white text-sm text-black shadow-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="lastName" className="block text-sm font-medium text-white">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    id="LastName"
                                    name="lastname"
                                    onChange={handleChange}
                                    className="mt-1 p-2 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium text-white"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    onChange={handleChange}
                                    className="mt-1 p-2 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-6 relative">
                                <label htmlFor="password" className="block text-sm font-medium text-white"> Password </label>

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="Password"
                                    name="password"
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md p-2 outline-none border-gray-200 bg-white text-sm text-black shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-6 inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                    and
                                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    type='submit'
                                    className="flex gap-2 shrink-0 rounded-md  bg-teal-600 px-12 py-3 text-sm font-medium  transition hover:bg-teal-700 text-black focus:outline-none focus:ring "
                                    onClick={handleSubmit}
                                >
                                    Create an account
                                    <UserRoundPlus className="w-5 h-4" />
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link href="/login" className="text-teal-700 underline"> Log in</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Register