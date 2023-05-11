'use client';

import Profile from '@components/Profile';
import { IPost } from '@types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${(session?.user as any).id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
    
        if ((session?.user as any)?.id) {
            fetchPosts();
        }
    }, [])

    const handleEdit = (post: any) => {
        router.push(`/update-prompt?id=${(post._id)}`)
    }

    const handleDelete = async (post: any) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE',
                })

                const filteredPosts = posts.filter(p => (p as any)._id !== post._id)
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile 
            name="My"
            description="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile