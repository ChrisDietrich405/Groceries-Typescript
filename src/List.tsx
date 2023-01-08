import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IList } from "./model";

interface ListProps {
  items: IList[];
  deleteItem: (id: number) => void
  editItem: (id: number) => void
}

const List = ({ items, deleteItem, editItem }: ListProps) => {
  return (
    <section className="grocery-list">
      {items.map((item) => {
        const { title, id } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button onClick={() => editItem(id)} type="button" className="edit-btn">
                <FaEdit />
              </button>
              <button onClick={() => deleteItem(id)} type="button" className="edit-btn">
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default List;
