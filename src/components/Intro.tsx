import { useEffect } from 'react';
export const Intro = () => {
	useEffect(() => {
		// console.log('⏫Intro component created⏫');
	}, []);
	return (
		<>
			<section className="intro" id="intro">
				<h1>
					THE WEB <span>QUALITY</span>
				</h1>
				<p>By hands</p>
			</section>
		</>
	);
};
