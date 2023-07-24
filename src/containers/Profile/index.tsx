import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store";
import NotVerifiedBanner from "../../components/NotVerifiedBanner";
import ProfileSqueleton from "../../components/ProfileSqueleton";
import UserData from "../../components/UserData";
import { navigate } from "gatsby";
import { AiFillEdit } from "react-icons/ai";
import "./index.scss";
import UpdateProfileModal from "../../components/UpdateProfileModal";

export default function ProfileContainer() {
	const isBrowser = typeof window !== "undefined";
	const store = isBrowser && useUserStore((state) => state);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (isBrowser && store && store?.id) {
			store.getUserData(store.id);
		}
	}, []);

	console.log(store);

	if (store && store.token === null) {
		navigate("/Login");
	}

	if (isBrowser && store && store?.loading) return <ProfileSqueleton />;

	return (
		<div className="w-full max-w-screen-xl mx-auto px-2">
			{open && (
				<UpdateProfileModal
					closeAction={() => {
						setOpen(false);
					}}
				/>
			)}
			<header className="w-full flex flex-wrap justify-between items-center px-2 pt-8 gap-y-2">
				<h1 className="flex items-center gap-2 text-2xl font-bold">
					{isBrowser && store && store.name}{" "}
					<AiFillEdit
						className="hover:cursor-pointer editButton"
						onClick={() => {
							setOpen(true);
						}}
					/>
				</h1>
				<button
					type="button"
					onClick={() => {
						if (isBrowser && store) {
							store?.logout();
						}
					}}
					className="action-button-1"
				>
					cerrar sesion
				</button>
				<div className="clientInfoContainer w-full flex flex-wrap justify-between">
					<div className="clientAddress">
						<h3 className="font-bold text-xl">Mi Direccion</h3>
						<p className="w-full flex flex-wrap justify-between">
							<b>direccion: </b>
							{isBrowser && store && store.userData?.address}
						</p>
						<p className="w-full flex flex-wrap justify-between">
							<b>Estado: </b>
							{isBrowser && store && store.userData?.zone.State}
						</p>
						<p className="w-full flex flex-wrap justify-between">
							<b>Area: </b>
							{isBrowser && store && store.userData?.zone.area}
						</p>
						<p className="w-full flex flex-wrap justify-between">
							<b>Codigo Postal: </b>
							{isBrowser && store && store.userData?.zone.ZIPCode}
						</p>
					</div>
					<div className="clientSeller">
						<h3 className="font-bold text-xl">Mi vendedor</h3>
						<p className="w-full flex flex-wrap justify-between">
							<b>nombre: </b>
							{isBrowser && store && store.userData?.seller.name}
						</p>
						<p className="w-full flex flex-wrap justify-between">
							<b>email: </b>
							{isBrowser && store && store.userData?.seller.email}
						</p>
						<p className="w-full flex flex-wrap justify-between">
							<b>numero de contacto: </b>
							{isBrowser && store && store.userData?.seller.phone}
						</p>
					</div>
				</div>
			</header>
			<div className="w-full mt-4 min-h-screen pb-8">
				{isBrowser && store && store?.userData && !store.userData.verified ? (
					<NotVerifiedBanner />
				) : (
					<UserData />
				)}
			</div>
		</div>
	);
}
