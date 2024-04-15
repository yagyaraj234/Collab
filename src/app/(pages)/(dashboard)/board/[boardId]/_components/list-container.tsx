"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { ListWithCards } from "../../../../../../../types";
import { ListForm } from "./list-form";
import { ListItems } from "./list-items";

import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "../../../../../../../action/update-list-order";
import { updateCardOrder } from "../../../../../../../action/update-card-order";
import { exec } from "child_process";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderData, setOrderData] = useState<ListWithCards[]>(data);

  const { run: runOnListOrderChange } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List re-ordered successfully");
    },
    onError: () => {
      toast.error("Failed to update list order");
    },
  });
  const { run: runOnCardOrderChange } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card re-ordered successfully");
    },
    onError: () => {
      toast.error("Failed to update card order");
    },
  });

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    //If Drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //If Drop in the different position

    // User moves a list
    if (type === "list") {
      const items = reorder(orderData, source.index, destination.index).map(
        (list, index) => ({ ...list, order: index })
      );
      setOrderData(items);
      runOnListOrderChange({ items, boardId });
    }

    // User moves a card
    if (type === "card") {
      const newOrderedData = [...orderData];

      // Get the source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      // Get the card that is being moved
      if (!sourceList || !destinationList) return;

      // Check if Card is existing in the source list

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if card is existing in the destination list
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // Moving card in same list
      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        sourceList.cards = items;

        items.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = items;
        setOrderData(newOrderedData);

        //  Update the order of the cards in the database
        runOnCardOrderChange({
          items,
          boardId,
        });
      } else {
        // Moving card to different list
        const [removed] = sourceList.cards.splice(source.index, 1);

        // Update the listId of the card
        removed.listId = destination.droppableId;

        // Add the card to the destination list
        destinationList.cards.splice(destination.index, 0, removed);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // Update the order of the cards in the destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderData(newOrderedData);

        //  Update the order of the cards in the database

        runOnCardOrderChange({
          items: destinationList.cards,
          boardId,
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-4"
          >
            {orderData.map((list, index) => (
              <ListItems key={list.id} data={list} index={index} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
