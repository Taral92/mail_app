

import { useSelector } from "react-redux";
import Usegetallemails from "../hooks/Usegetallemails";
import Email from "./Email";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Emails = () => {
  Usegetallemails();
  const { emails, searchText } = useSelector((store) => store.z);
  const [filteredEmail, setFilteredEmail] = useState([]);

  
  const categorizedemail = async (subject, message) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCkJbwFGYGqCofn0E5hALWGGP6FHR-BdT0"); 
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Classify the following email into one of these categories: PRIMARY, SOCIAL, PROMOTIONS, UPDATES.
      Email Subject: ${subject}
      Email Message: ${message}
      Respond with only the category name.`;

      const result = await model.generateContent(prompt);
      console.log("AI Response:", result);

     
      const category = result.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      return category || "Uncategorized";
    } catch (error) {
      console.error("Error categorizing email:", error);
      return "Uncategorized";
    }
  };

  useEffect(() => {
    if (!emails) {
      setFilteredEmail([]);
      return;
    }

    const filterAndCategorizeEmails = async () => {
      const categorizedEmails = await Promise.all(
        emails
          .filter((email) =>
            email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
            email.to.toLowerCase().includes(searchText.toLowerCase()) ||
            email.message.toLowerCase().includes(searchText.toLowerCase())
          )
          .map(async (email) => ({
            ...email,
            category: await categorizedemail(email.subject, email.message),
          }))
      );

      setFilteredEmail(categorizedEmails);
    };

    filterAndCategorizeEmails();
  }, [searchText, emails]);

  return (
    <div className="justify-center">
      {filteredEmail &&
        filteredEmail.map((email) => (
          <Email key={email.id} email={email} category={email.category} />
        ))}
    </div>
  );
};

export default Emails;




















