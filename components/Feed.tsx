'use client';

import { IPost } from "@types";
import { useEffect, useMemo, useState } from "react";
import PromptCard from "./PromptCard";

interface IPromptCardListProps {
  data: IPost[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({
  data,
  handleTagClick
}: IPromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={(post as any)._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState<IPost[]>([]);

  const allPosts = useMemo(() => {
    const filter = searchText?.toLowerCase() || "";
    return posts.filter(p => 
        p.prompt.toLowerCase().includes(filter) ||
        p.tag.toLowerCase().includes(filter) ||
        (p as any).creator.username.toLowerCase().includes(filter)
      )
  }, [posts, searchText])

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  }

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={allPosts}
        handleTagClick={(tag) => handleTagClick(tag)}
      />
    </section>
  )
}

export default Feed