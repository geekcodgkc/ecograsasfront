import React, { useEffect } from "react";
import { useUserStore } from "../../store";
import api from "../../utils/api";
import NotVerifiedBanner from "../../components/NotVerifiedBanner";

export default function ProfileContainer() {
	const store = useUserStore((state) => state);

	useEffect(() => {
		if (store.id && !store.userData && store._id) {
			store.getUserData(store._id);
		}
	}, [store._id]);

	console.log("current: ", store);

	if (!store.userData || !store.userData.verified) <NotVerifiedBanner />;

	return <div>ProfileContainer</div>;
}
