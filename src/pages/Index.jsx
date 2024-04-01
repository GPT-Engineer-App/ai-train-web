import React, { useState, useRef } from "react";
import { Box, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Button, Select, Spinner, useToast, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";

const Index = () => {
  const [modelType, setModelType] = useState("llm");
  const [modelName, setModelName] = useState("");
  const [datasetUrl, setDatasetUrl] = useState("");
  const [trainingData, setTrainingData] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTraining(true);

    try {
      // Show a success toast when training is complete
      toast({
        title: "Training Complete",
        description: `${modelName} has been successfully trained.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Show an error toast if training fails
      toast({
        title: "Training Failed",
        description: "An error occurred while training the model.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsTraining(false);
  };

  const fileInputRef = useRef();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Train ML/AI Models
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {}
          <FormControl id="fileUpload">
            <FormLabel>Upload File (CSV, TXT, JSON, JSONL)</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaFileUpload} color="gray.300" />
              </InputLeftElement>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: "none" }} accept=".csv,.txt,.json,.jsonl" />
              <Button onClick={() => fileInputRef.current.click()}>{uploadedFile ? uploadedFile.name : "Choose File"}</Button>
            </InputGroup>
            {uploadedFile && (
              <Text fontSize="sm" marginTop={2}>
                {uploadedFile.name}
              </Text>
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={isTraining}>
            {isTraining ? <Spinner size="sm" /> : "Train Model"}
          </Button>
        </VStack>
      </form>
      <Text marginTop={8} textAlign="center">
        Select a model type, provide a name, dataset URL, and training data to train your ML/AI model.
      </Text>
    </Box>
  );
};

export default Index;
