"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth.client";

const Page = () => {
  const handleSignIn = async () => {
    return await authClient.signIn.social({ provider: "google" });
  };
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            height={32}
            width={32}
          />
          <h1>SnapCast</h1>
          <h2>By Emran Hossain</h2>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src="/assets/icons/star.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
              ))}
            </figure>
            <p>
              Snapcast makes screening and sharing videos a breeze. The
              interface is intuitive, and it is perfect for both personal and
              professional use.
            </p> 
            <article>
              <div>
                <h2>Peri Mukuben</h2>
                <p>Product Designer, NovaByte</p>
              </div>
            </article>
          </section>
        </div>
        <p>Snapcast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              height={32}
              width={32}
            />
          </Link>
          <p>
            Create and share your very first <span>SnapCast Video</span> in no
            time!
          </p>
          <button onClick={handleSignIn}>
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              width={22}
              height={22}
            />
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay" />
    </main>
  );
};

export default Page;
