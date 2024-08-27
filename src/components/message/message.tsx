import { useUser } from "@auth0/nextjs-auth0/client"
import { IconRobotFace } from "@tabler/icons-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { TypewriterEffectSmooth } from "../aceternity/typeWriter";

export default function Message({ role, content }: { role: string, content: string }) {

    const { user } = useUser();

    const words = content.split(' ').map(word => ({ text: word }))


    return (
        <div className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${role === 'model' ? 'bg-slate-600' : ''}`}>
            <div>
                {
                    role === "user" && (
                        <Image src={user?.picture as string} alt={user?.name as string} width={30} height={30} className="rounded-sm shadow-md shadow-black/50" />
                    )
                }
                {
                    role === 'model' && (
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-sm shadow-md shadow-black/50 bg-gray-800">
                            <IconRobotFace className="text-emerald-100" />
                        </div>
                    )
                }
            </div>
            <div className="prose prose-invert">
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </div>
        </div>
    )
} 