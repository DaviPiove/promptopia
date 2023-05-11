import { IPost } from "@types";
import PromptCard from "./PromptCard";

interface IProfileProps {
  name: string;
  description: string;
  data: IPost[];
  handleEdit?: (post: any) => void;
  handleDelete?: (post: any) => void;
}

const Profile = ({
  name,
  description,
  data,
  handleEdit,
  handleDelete
}: IProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">
        {description}
      </p>
      
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard 
            key={(post as any)._id}
            post={post}
            handleEdit={() => handleEdit?.(post)}
            handleDelete={() => handleDelete?.(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile