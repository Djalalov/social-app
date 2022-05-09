import { atom } from "recoil";

//const [modalState, setModalState] = useState(false);
export const modalState = atom({
	key: "modalState",
	default: false,
});

export const postIdState = atom({
	key: "postIdState",
	default: "",
});
