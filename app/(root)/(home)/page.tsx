import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Home | DevFlow",
  description:
    "Get answers to your questions, share your knowledge, and find the best solutions to your problems.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  let result;
  const { userId } = auth();

  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        page: searchParams.page ? +searchParams.page : 1,
        searchQuery: searchParams.q,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Qustion
          </Button>
        </Link>
      </div>
      <div className="max:sm:flex-col mt-11 flex justify-between gap-5 sm:items-center">
        <LocalSearchBar
          iconPostion="left"
          route="/"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions.length > 0 ? (
          result?.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the slience! 🚀 Ask a question and kickstart the
        discussion. Our query could be the next big thing othes learn from. Get
        invloved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Home;
