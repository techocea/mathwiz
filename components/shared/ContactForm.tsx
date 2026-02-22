"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { ContactData, ContactFormProps } from "@/global";
import { Loader2 } from "lucide-react";

const ContactForm = ({ loading, onSubmit }: ContactFormProps) => {
    const { register, handleSubmit, reset } = useForm<ContactData>({
        defaultValues: {
            name: "",
            contact: "",
            email: "",
            message: "",
        },
    });

    const handleFormSubmit = async (data: ContactData) => {
        await onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Student Name
                    </Label>
                    <Input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <Label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Contact Number
                    </Label>
                    <Input
                        {...register("contact", { required: true })}
                        type="tel"
                        placeholder="07XXXXXXXX"
                    />
                </div>

                <div>
                    <Label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Email Address
                    </Label>
                    <Input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="john.doe@example.us"
                        className=""
                    />
                </div>

                <div>
                    <Label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Message
                    </Label>
                    <textarea
                        {...register("message")}
                        rows={3}
                        className="placeholder:text-sm w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 "
                        placeholder="Questions about online or physical classes?"
                    ></textarea>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start">
                <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full cursor-pointer px-12 py-5 bg-slate-950 text-white font-bold rounded-full transition-all overflow-hidden shadow-2xl disabled:cursor-not-allowed"
                >
                    {/* Background Hover/Loading Effect */}
                    <div
                        className={`absolute inset-0 bg-amber-500 transition-transform duration-300 ${loading
                            ? "translate-y-0"
                            : "translate-y-full group-hover:translate-y-0"
                            }`}
                    ></div>

                    {/* Button Content */}
                    <div className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-slate-950">
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span className={loading ? "text-slate-950" : ""}>
                                    Sending...
                                </span>
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </div>
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
