export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer id="footer" className="footer">
      <p className="mb-0">© Universidade Federal do Pará, {ano}</p>
    </footer>
  );
}
