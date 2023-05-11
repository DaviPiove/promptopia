'use client';

import Profile from '@components/Profile';
import { IPost } from '@types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IUserProfileProps {
    params: { id: string };
}

const UserProfile = ({ params }: IUserProfileProps) => {

    const searchParams = useSearchParams();

    const userName = searchParams.get('name') || "";
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            debugger;
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();
          setPosts(data);
        }
    
        if (params?.id) {
            fetchPosts();
        }
    }, [])

    return (
        <Profile 
            name={userName}
            description={`Welcome to ${userName} profile page`}
            data={posts}
        />
    )
}

export default UserProfile