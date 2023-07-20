import React, { useEffect } from "react";
import { useUserStore } from "../../store";
import NotVerifiedBanner from "../../components/NotVerifiedBanner";
import ProfileSqueleton from "../../components/ProfileSqueleton";
import UserData from "../../components/UserData";
import { navigate } from "gatsby";
import { BiUserCircle } from "react-icons/bi";

export default function ProfileContainer() {
	const store = useUserStore((state) => state);

	useEffect(() => {
		if (store.id) {
			store.getUserData(store.id);
		}
	}, []);

	if (!store.token) navigate("/Login");

	if (store.loading) return <ProfileSqueleton />;

	return (
		<div className="w-full max-w-screen-xl mx-auto px-2">
			<header className="w-full flex flex-wrap justify-between items-center py-8">
				<h1 className="flex items-center gap-2 text-2xl font-bold">
					{store.name} <BiUserCircle />
				</h1>
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
			<div className="w-full mt-4 min-h-screen pb-8">
				{store.userData && !store.userData.verified ? (
					<NotVerifiedBanner />
				) : (
					<UserData />
				)}
			</div>
		</div>
	);
}
