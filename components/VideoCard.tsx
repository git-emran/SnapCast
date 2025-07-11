"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
interface VideoCardProps {
  id?: string;
  title?: string;
  thumbnail: string;
  username?: string;
  createdAt?: Date;
  userImg: string | StaticImport;
  views?: number | null;
  visibility?: string;
  duration?: number | null;

}

const VideoCard = ({
  id,
  title,
  thumbnail,
  username,
  createdAt,
  userImg,
  views,
  visibility,
  duration,
}: VideoCardProps) => {
  return (
    <Link href={`/video/${id}`} className="video-card">
      <Image
        src={thumbnail}
        alt="Thumbnail"
        width={290}
        height={160}
        className="thumbnail"
      />
      <article>
        <div>
          <figure>
            <Image
              src={userImg || ""}
              alt="avatar"
              width={34}
              height={34}
              className="rounded-full aspect-square"
            />
            <figcaption>
              <h3>{username}</h3>
              <p>{visibility}</p>
            </figcaption>
          </figure>
          <aside>
            <Image
              src="/assets/icons/eye.svg"
              alt="views"
              width={16}
              height={16}
            />
            <span>{views} views</span>
          </aside>
        </div>
        <h2>
          {title} - {""}{" "}
          {createdAt
            ? createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : ""}
        </h2>
        
      </article>
      <button onClick={() => {}} className="copy-btn">
        <Image src="/assets/icons/link.svg" alt="copy" width={18} height={18} />
      </button>
      {duration && (
        <div className="duration">
          {Math.ceil(duration / 60)} mins {duration % 60} sec
        </div>
      )}
    </Link>
  );
};

export default VideoCard;
