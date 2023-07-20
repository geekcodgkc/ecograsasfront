import React, { useEffect } from "react";
import { useUserStore } from "../../store";
import api from "../../utils/api";
import NotVerifiedBanner from "../../components/NotVerifiedBanner";
import ProfileSqueleton from "../../components/ProfileSqueleton";

export default function ProfileContainer() {
	const store = useUserStore((state) => state);

	useEffect(() => {
		if (!store.userData && store.id) {
			store.getUserData(store.id);
		}
	}, []);

	console.log("current: ", store);

	if (store.loading) return <ProfileSqueleton />;

	return (
		<div className="w-full max-w-screen-xl mx-auto">
			<header className="w-full flex flex-wrap justify-between items-center py-8">
				<h1>ProfileContainer</h1>
				<button
					type="button"
					onClick={() => {
						store.logout();
					}}
					className="action-button-1"
				>
					cerrar sesion
				</button>
			</header>
			<div className="w-full mt-4 h-5/6">
				{store.userData && !store.userData.verified && <NotVerifiedBanner />}
			</div>
		</div>
	);
}
