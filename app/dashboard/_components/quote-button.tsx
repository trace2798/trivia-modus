// "use client";
// import { Button } from "@/components/ui/button";
// import { GET_QUOTE } from "@/lib/queries";
// import { useSuspenseQuery } from "@apollo/client";
// import { FC } from "react";

// interface QuoteButtonProps {}

// const QuoteButton: FC<QuoteButtonProps> = ({}) => {
//   const handleClick = async () => {
//     const { data } = useSuspenseQuery(GET_QUOTE);

//     //console.log(data);
//   };
//   return (
//     <>
//       <div>
//         QuoteButton
//         <Button onClick={() => handleClick()}>Get Random Quote</Button>
//       </div>
//     </>
//   );
// };

// export default QuoteButton;
'use client';

import { Button } from '@/components/ui/button';
import { GET_QUOTE } from '@/lib/queries';
import { useLazyQuery } from '@apollo/client';
import { FC, useState } from 'react';

interface QuoteButtonProps {}

const QuoteButton: FC<QuoteButtonProps> = ({}) => {
  const [res, setRes] = useState({ quote: '', author: '' });
  const [getQuote, { data, loading, error }] = useLazyQuery(GET_QUOTE, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ randomQuote }) => {
      //console.log(randomQuote);
      const { quote, author } = randomQuote;
      setRes({ quote, author });
    },
  });
  //console.log('DATA', data);
  const handleClick = async () => {
    getQuote(); // Triggers the query
  };
  //console.log('DATA2', data);
  return (
    <div>
      <Button onClick={handleClick}>Get Random Quote</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Quote: {res.quote}</p>}
    </div>
  );
};

export default QuoteButton;
