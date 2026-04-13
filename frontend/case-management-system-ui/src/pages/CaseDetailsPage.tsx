import { useParams } from "react-router-dom";

function CaseDetailsPage() {
  const { id } = useParams();

  return (
    <section>
      <h2>Case Details</h2>
      <p>Viewing case ID: {id}</p>
    </section>
  );
}

export default CaseDetailsPage;