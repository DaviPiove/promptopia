"use client";

import Form from "@components/Form";
import { IPost } from "@types";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EventHandler, FormEvent, useState } from "react";



const CreatePrompt = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<IPost>({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: (session?.user as any).id
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form 
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;
