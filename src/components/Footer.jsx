const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-700 bg-slate-900 py-8 px-6 text-center">
      <p className="text-sm text-slate-400">
        &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
