import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUnload } from '../../utils/useUnload';
import { motion } from "framer-motion";

const pageVariants = {
	initial: {
		opacity: 0
	},
	in: {
		opacity: 1
	},
	out: {
		opacity: 0
	}
};

const pageTransition = {
	type: "tween",
	ease: "linear",
	duration: 0.3
};

export function AppLayout( {children} ) {
	const { pathname } = useLocation();	

	useUnload(e => {
		e.preventDefault();
		e.returnValue = '';
	});   

	return (
		<motion.div
			key={pathname}
			initial="initial"
			animate="in"
			variants={pageVariants}
			transition={pageTransition}
		>
			{children}
			<Outlet />
		</motion.div>
	);
}
