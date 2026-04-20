export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer id="footer" className="footer row">
      <p className="text-center text-body-secondary">© Universidade Federal do Pará, {ano}</p>
    </footer>
  );
}
