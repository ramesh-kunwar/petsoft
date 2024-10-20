"use client";
import { createContext, useState } from "react";
// import { Pet } from "../lib/types.ts";
import { Pet } from "@/lib/types";
import { addPet } from "@/actions/actions";
type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};
type TPetcontext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void;
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

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // setPets((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now().toString(),
    //     ...newPet,
    //   },
    // ]);
    await addPet(newPet); // Server action
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
    //
    setPets((prevPets) => {
      return prevPets.map((pet) => {
        if (pet.id === petId) {
          return {
            id: petId,
            ...newPetData,
          };
        }
        return pet;
      });
    });
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
        handleAddPet,
        handleEditPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
