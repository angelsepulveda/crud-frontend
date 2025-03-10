type TGoogleSpinnerProps = {
	size?: number;
	className?: string;
};

export const GoogleSpinner = ({
	size = 24,
	className = "",
}: TGoogleSpinnerProps) => {
	return (
		<div
			className={`inline-block ${className}`}
			style={{width: size, height: size}}
		>
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<style>{`
          .spinner_ajPY {
            transform-origin: center;
            animation: spinner_AtaB .75s infinite linear;
          }
          @keyframes spinner_AtaB {
            100% {transform: rotate(360deg)}
          }
        `}</style>
				<path
					d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
					opacity=".25"
					fill="currentColor"
				/>
				<path
					d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
					className="spinner_ajPY"
					fill="#4285F4"
				/>
			</svg>
		</div>
	);
};
