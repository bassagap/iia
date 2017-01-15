import React from 'react';

export const MainLayout = ({content}) => (
	<div className = "main-layout">
	<header>
		<h2>
			INTERNAL ISUES ASSESSMENT
		</h2>
		<nav>
			<a href = "/">Testing </a>
           	<a href = "/development">Development </a>
           	<a href = "/business">Business</a>
		</nav>
	</header>
	<main>
		{content}
	</main>
	</div>
	)