export const validateRut = (rut: string) => {
	// Eliminar puntos y guión y convertir a mayúsculas para manejar 'k' y 'K'
	const rutClean = rut.replace(/[.-]/g, "").toUpperCase();

	if (rutClean.length < 2) return false;

	// Separar el cuerpo del dígito verificador
	const dv = rutClean.charAt(rutClean.length - 1);
	const rutBody = rutClean.substring(0, rutClean.length - 1);

	// Verificar que el cuerpo solo contenga números
	if (!/^\d+$/.test(rutBody)) return false;

	// Algoritmo para calcular el dígito verificador
	let sum = 0;
	let multiplier = 2;

	// Recorrer el RUT de derecha a izquierda
	for (let i = rutBody.length - 1; i >= 0; i--) {
		sum += Number.parseInt(rutBody.charAt(i), 10) * multiplier;
		multiplier = multiplier === 7 ? 2 : multiplier + 1;
	}

	// Calcular el dígito verificador esperado
	const remainder = sum % 11;
	const dvExpected = 11 - remainder;

	// Convertir el dígito verificador calculado a su representación
	let dvCalculated;
	if (dvExpected === 11) {
		dvCalculated = "0";
	} else if (dvExpected === 10) {
		dvCalculated = "K";
	} else {
		dvCalculated = dvExpected.toString();
	}

	// Comparar el dígito verificador calculado con el proporcionado
	return dv === dvCalculated;
};

export const formatRut = (value: string) => {
	const rutClean = value.replace(/[.-]/g, "").toUpperCase();

	if (rutClean.length <= 1) return rutClean;

	const dv = rutClean.charAt(rutClean.length - 1);
	const rutNumber = rutClean.substring(0, rutClean.length - 1);

	let formatted = "";
	let count = 0;

	for (let i = rutNumber.length - 1; i >= 0; i--) {
		formatted = rutNumber.charAt(i) + formatted;
		count++;
		if (count === 3 && i !== 0) {
			formatted = "." + formatted;
			count = 0;
		}
	}

	return formatted + "-" + dv;
};
