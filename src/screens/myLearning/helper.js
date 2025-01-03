import React, { useState } from "react";
import { Chatbot } from "../../components";
import { learningData } from "../../helper/helper";
import { Document, Question, QuizSection, Result } from "./components";
import { useNavigate } from "react-router-dom";

export const ActiveComponent = ({ setCurrComponent }) => {
  const [id, setId] = useState("");
  let data = learningData?.find((val) => val?.id === id);
  const navigate = useNavigate()

  return {
    document: {
      component: (
        <Document
          handleClick={(data) => {
            navigate(
              `/my-learning/`,
              {
                state: {
                  departData: data
                },
              }
            )
          }}
        />
      ),
    },
    summary: {
      component: <Chatbot data={data} />,
    },
    keyPoints: {
      component: <Chatbot data={data} />,
    },
    attemptQuiz: {
      component: <QuizSection setCurrComponent={setCurrComponent} />,
    },
    question: {
      component: <Question setCurrComponent={setCurrComponent} />,
    },
    result: { component: <Result setCurrComponent={setCurrComponent} /> },
  };
};

export const tabsArray = ({ setCurrComponent, setActiveTab }) => {
  return [
    {
      tabName: "Summary",
      func: () => {
        setCurrComponent("summary");
        setActiveTab("Summary");
      },
    },
    {
      tabName: "Key Points",
      func: () => {
        setCurrComponent("keyPoints");
        setActiveTab("Key Points");
      },
    },
    {
      tabName: "Quiz",
      func: () => {
        setCurrComponent("attemptQuiz");
        setActiveTab("Quiz");
      },
    },
  ];
};
