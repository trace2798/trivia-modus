import { FC } from 'react';

interface GenerateTriviaButtonProps {
  promptData: any;
}

const GenerateTriviaButton: FC<GenerateTriviaButtonProps> = ({
  promptData,
}) => {
  const dataString = JSON.stringify(promptData);

  return (
    <>
      <div>GenerateTriviaButton</div>
      {dataString}
    </>
  );
};

export default GenerateTriviaButton;
