import ProfileSheet from "./profile-sheet";

const Navbar = () => {
  return (
    <div className="bg-primary absolute top-0 right-0 left-0">
      <nav className="container px-4 sm:px-0 mx-auto py-4 flex items-center justify-between">
        <ul className="flex items-center gap-8 text-white">
          <li className="">Home</li>
          <li className="">About</li>
        </ul>
        <ProfileSheet />
      </nav>
    </div>
  );
};

export default Navbar;
