import type { FunctionComponent } from 'react';

import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from 'features/Landing';
import Navbar from 'layout/Navbar';

const PasswordGenerator = lazy(() => import('features/password-generator'));
const CaesarCipher = lazy(() => import('features/caesar-cipher'));
const NotFound = lazy(() => import('features/NotFound'));

const RouteFallback: FunctionComponent = () => (
	<output className="route-loading">Loading…</output>
);

const App: FunctionComponent = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<main>
					<Suspense fallback={<RouteFallback />}>
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route
								path="/generator"
								element={<PasswordGenerator />}
							/>
							<Route path="/cipher" element={<CaesarCipher />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>
			</BrowserRouter>
		</div>
	);
};

export default App;
