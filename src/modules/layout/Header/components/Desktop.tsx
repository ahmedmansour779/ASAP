import NavLinks from "../../components/NavLinks";
import ActionButtons from "./ActionButtons";

export default function Desktop() {
  return (
    <div className="hidden flex-1 flex-wrap items-center gap-6 lg:flex">
      <NavLinks className="ltr:mr-auto rtl:ml-auto" />
      <ActionButtons />
    </div>
  );
}
