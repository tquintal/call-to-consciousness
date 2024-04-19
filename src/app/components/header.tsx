const Header = () => {
  return (
    <div className="h-28 border-red-500 border-b flex items-center p-6 justify-between">
      <div className="flex gap-4">
        <div className="rounded-full bg-orange-400 h-7 w-7" />
        <div className="flex flex-col">
          <b>Susana Quintal</b>
          <p className="text-sm">Marketing e comunicação consciente</p>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="cursor-pointer">Percurso</span>
        <span>|</span>
        <span className="cursor-pointer">Serviços</span>
        <span>|</span>
        <span className="cursor-pointer">Contacto</span>
      </div>
    </div>
  );
};

export default Header;
