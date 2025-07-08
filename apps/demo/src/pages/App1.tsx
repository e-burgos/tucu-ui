import { Button, CardContainer, CardTitle, useToastStore } from 'tucu-ui';

function App1() {
  const { addToast } = useToastStore();
  return (
    <CardContainer className="h-[300px]">
      <CardTitle
        title="App 1"
        className="flex flex-col justify-center items-center"
      >
        <Button
          fullWidth
          onClick={() =>
            addToast({
              id: '1',
              title: 'Hello',
              message: 'This is a toast, find me in the bottom right corner',
              variant: 'success',
              dismissing: false,
              timeout: 3000,
            })
          }
        >
          Click me
        </Button>
      </CardTitle>
    </CardContainer>
  );
}

export default App1;
