import { useState } from "react";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: ItemId;
  text: string;
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    text: "Iván Caravajal",
  },
  {
    id: crypto.randomUUID(),
    text: "Gerónimo Riesco",
  },
];

function App() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;

    // const input = elements.namedItem('item') as HTMLInputElement
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
    };

    setItems((prevItems) => {
      return [...prevItems, newItem];
    });

    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  return (
    <main className="h-screen grid place-content-center max-w-2xl mx-auto">
      <aside className="bg-gray-200 p-4 rounded-md">
        <h1 className="text-2xl font-bold mb-1">Prueba técnica de React</h1>
        <h2 className="text-lg font-semibold mb-4">
          Añadir y eliminar elementos de una lista
        </h2>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="block mb-2">
            Elemento a introducir:
            <input
              name="item"
              required
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Devs React 🚀"
            />
          </label>
          <button className="bg-[#4F6997] text-white w-full px-4 py-2 rounded">
            Añadir elemento a la lista
          </button>
        </form>
      </aside>

      <section className="p-4">
        <h2 className="text-xl font-bold mb-4">Lista de elementos</h2>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">
            <strong>No hay elementos en la lista.</strong>
          </p>
        ) : (
          <ul className="list-disc">
            {items.map((item) => (
              <li
                key={item.id}
                className="mb-2 flex justify-between items-center"
              >
                <span>{item.text}</span>
                <button
                  onClick={createHandleRemoveItem(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar elemento
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer>
        <a
          className="flex justify-center"
          href="https://www.artech-consulting.com.ar/"
          target="_blank"
        >
          <img
            className="absolute bottom-0 mb-8 h-8 w-auto"
            src="/logo.png"
            alt="Logo de Artech"
          />
        </a>
      </footer>
    </main>
  );
}

export default App;
