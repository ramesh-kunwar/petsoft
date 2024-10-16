"use client";
import { createContext, useState } from "react";
import { Pet } from "../lib/types.ts";
type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};
type TPetcontext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
};

export const PetContext = createContext<TPetcontext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //
  //

  // sate
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state;
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;
  // event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prevPets) => {
      return prevPets.filter((pet) => pet.id !== id);
    });
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
