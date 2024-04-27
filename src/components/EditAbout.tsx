"use client";

import { useState } from "react";

export const EditAbout = ({ content }: { content: string }) => {
  const [contentState, setContentState] = useState(content);
  return (
    <div className="flex flex-col gap-2 pt-2">
      <textarea
        defaultValue={content}
        onChange={(e) => setContentState(e.target.value)}
        className="p-6 min-h-96 outline-none border resize-none"
      />
      <button className="border p-3 bg-slate-300" onClick={() => console.log(contentState)}>
        Guardar
      </button>
    </div>
  );
};
