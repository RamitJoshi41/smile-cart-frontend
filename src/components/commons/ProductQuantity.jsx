import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Input } from "neetoui";

const ProductQuantity = ({ slug, availableQuantity }) => {
  const { itemCount, setSelectedQuantity } = useSelectedQuantity(slug);

  const preventNavigation = e => (e.stopPropagation(), e.preventDefault());

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(itemCount - 1);
        }}
      />
      <Input
        className="ml-2"
        contentSize="4"
        value={itemCount}
        onClick={e => preventNavigation(e)}
        onChange={e => {
          preventNavigation(e);
          const val = e.target.value;
          if (/^\d*$/.test(val)) {
            const parsedVal = parseInt(val, 10) || 0;
            if (parsedVal <= availableQuantity) {
              setSelectedQuantity(parsedVal);
            }
          }
        }}
      />
      <Button
        className="focus-within:ring-0"
        disabled={itemCount >= availableQuantity}
        label="+"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(itemCount + 1);
        }}
      />
    </div>
  );
};

export default ProductQuantity;
