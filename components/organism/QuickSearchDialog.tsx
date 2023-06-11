import KeyComboItem from "@/components/KeyComboItem";
import { useProduct } from "@/hooks/useProduct";
import { useShortcut } from "@/hooks/useShortcut";
import { selectOperatingSystem } from "@/store/appSlice";
import { Product, Shortcut } from "@/types/types";
import {
  CircularProgress,
  DialogContent,
  Slide,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function QuickSearchDialog({ open, onClose }: Props) {
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // [
  const [options, setOptions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchProduct } = useProduct();
  const { searchShortcut } = useShortcut();
  const [value, setValue] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [shortcutList, setShortcutList] = useState([]);
  const selectedOperatingSystem = useSelector(selectOperatingSystem);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (value?.length === 1) {
      setSelectedProduct(value[0]);
      return;
    } else {
      setSelectedProduct(null);
    }
  }, [value]);

  async function searchProductHandler() {
    if (searchTerm?.length < 3) {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    const response = await searchProduct(searchTerm);
    setOptions([...response?.data]);
    setIsLoading(false);
  }

  async function searchShortcutHandler() {
    setOptions([]);
    if (searchTerm?.length < 3) {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    if (!selectedProduct) {
      return;
    }
    const response = await searchShortcut(selectedProduct.id, searchTerm);
    console.log(response?.data);
    setShortcutList(response?.data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!selectedProduct) {
      searchProductHandler();
    } else if (searchTerm?.length > 2) {
      searchShortcutHandler();
    } else {
      setOptions([]);
      setShortcutList([]);
    }
  }, [searchTerm]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      TransitionComponent={Transition}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>Quick Search</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Autocomplete
            autoFocus={true}
            value={value}
            multiple={true}
            fullWidth={true}
            open={openAutocomplete}
            onOpen={() => {
              console.log(selectedProduct);
              if (selectedProduct) {
                return;
              }
              setOpenAutocomplete(true);
            }}
            onClose={() => {
              setOpenAutocomplete(false);
            }}
            filterOptions={(x) => x}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option: Product) => {
              return option?.attributes?.name;
            }}
            options={options}
            loading={isLoading}
            onInputChange={(event, newInputValue) => {
              if (event.type === "blur") return;
              setSearchTerm(newInputValue);
            }}
            onChange={(event: any, newValue: Product[]) => {
              setValue([...newValue]);
            }}
            renderInput={(params) => (
              <TextField
                value={searchTerm}
                autoFocus={true}
                {...params}
                label="Quickly search keyboard shortcuts or commands"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => {
              return (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option?.attributes?.name}
                </Box>
              );
            }}
          />
        </Box>
        <Box
          sx={{
            height: "50vh",
            overflowY: "scroll",
          }}
        >
          {shortcutList?.map((shortcut: Shortcut) => {
            const id = shortcut?.id;
            return (
              <Box key={id}>
                <KeyComboItem
                  id={id}
                  attributes={shortcut?.attributes}
                  key={id}
                  operatingSystem={selectedOperatingSystem}
                />
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
