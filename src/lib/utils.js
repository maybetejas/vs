export function isValidName(name) {
	// Check if the name is not empty and contains only letters
	if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
		return false;
	}

	// Check if the name is not more than 50 characters
	if (name.length > 50) {
		return false;
	}

	return true;
}

export function isValidContact(contact) {
	// Check if the contact is not empty and contains only digits
	if (!contact || !/^\d+$/.test(contact)) {
		return false;
	}

	// Check if the contact is exactly 10 digits long
	if (contact.length !== 10) {
		return false;
	}

	return true;
}

export function isValidPassword(password, confirmPassword) {
	// Check if the password and confirmPassword match
	if (password !== confirmPassword) {
		return false;
	}

	// Check if the password is at least 10 characters long
	if (password.length < 10) {
		return false;
	}

	// You can add more password validation logic here if needed

	return true;
}

export function generateOTP(length) {
	const charset = '0123456789'; // The characters from which the OTP will be generated
	let otp = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		otp += charset[randomIndex];
	}

	return otp;
}

export function extractFirstName(fullName) {
	// Split the full name into an array of words
	const nameWords = fullName.trim().split(' ');

	// Return the first word, which is the first name
	return nameWords[0];
}

// utils.js
export function cycleGreetings(greetings, intervalTime) {
	let currentIndex = 0;
	let currentGreeting = greetings[currentIndex];

	// Function to update the current greeting
	function updateGreeting() {
		currentIndex = (currentIndex + 1) % greetings.length;
		currentGreeting = greetings[currentIndex];
	}

	const interval = setInterval(updateGreeting, intervalTime);

	// Return a function to stop the interval when needed
	return () => clearInterval(interval);
}

export const greetings = [
	'Hello', // English
	'नमस्ते', // Hindi
	'नमस्कार', //marathi
	'হ্যালো', // Bengali
	'வணக்கம்', // Tamil
	'ಹಲೋ', // Kannada
	'હલો', // Gujarati
	'ഹലോ', // Malayalam
	'ਹੈਲੋ', // Punjabi
	'ନମସ୍କାର', // Odia
	'హలో' // Telugu
];

export const servicesList = [
	{
		id: 1,
		svg: 'car.svg',
		name: 'interior',
		link: 'https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma',
		services: [
			'Exterior wash',
			'Vaccum',
			'Carpet wash',
			'Hood cleaning',
			'Dashboard polish',
			'Tyre polish',
			'Exterior Wax'
		]
	},
	{
		id: 2,
		svg: 'car.svg',
		name: 'exterior',
		link: 'https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma',
		services: ['Exterior wash', 'Tyre wash', 'Mud guard wash', 'Windshield wash', 'Wax']
	},
	{
		id: 3,
		svg: 'car.svg',
		name: 'fullBody',
		link: 'https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma',
		services: ['Vaccum', 'Carpet cleaning', 'Hood cleaning', 'Dashboard polish']
	},
	{
		id: 4,
		svg: 'car.svg',
		name: 'waterless',
		link: 'https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma',
		services: ['Vaccum', 'Carpet cleaning', 'Hood cleaning', 'Dashboard polish']
	}
];

export const subscriptions = [
	{
		id: 7,
		svg: 'location.svg',
		name: 'weekly',
		link: 'https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma',
		services: ['Tyres', 'Windows', 'Panels', 'lights', 'Rims']
	},
	{
		id: 8,
		svg: 'location.svg',
		name: 'bi-weekly',
		link: 'https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma',
		services: ['Tyres', 'Windows']
	},
	{
		id: 9,
		svg: 'location.svg',
		name: 'Monthly',
		link: 'https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma',
		services: ['lights', 'Rims', 'Rims', 'Rims', 'Rims']
	}
];

export let workHours = {
	Monday: {
		active: false,
		batchOne: {
			start: '08:00',
			end: '13:00'
		},
		batchTwo: {
			start: '14:00',
			end: '15:00'
		}
	},
	Tuesday: {
		active: false,
		batchOne: {
			start: '08:00',
			end: '13:00'
		},
		batchTwo: {
			start: '14:00',
			end: '15:00'
		}
	},

	Wednesday: {
		active: false,
		batchOne: {
			start: '08:00',
			end: '13:00'
		},
		batchTwo: {
			start: '14:00',
			end: '15:00'
		}
	},
	Thursday: {
		active: false,
		batchOne: {
			start: '08:00',
			end: '13:00'
		},
		batchTwo: {
			start: '14:00',
			end: '15:00'
		}
	},
	Friday: {
		active: false,
		batchOne: {
			start: '08:00',
			end: '13:00'
		},
		batchTwo: {
			start: '14:00',
			end: '15:00'
		}
	},
	Saturday: {
		active: false,
		batchOne: {
			start: '08:00',
			end: '13:00'
		},
		batchTwo: {
			start: '14:00',
			end: '15:00'
		}
	},
	Sunday: {
		active: false,
		batchOne: {
			start: '08:00',
			end: '13:00'
		},
		batchTwo: {
			start: '14:00',
			end: '15:00'
		}
	}
};

export function getUserLocation() {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					const userLocation = { lat: latitude, lng: longitude };
					resolve(userLocation);
				},
				(error) => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							reject('User denied the request for Geolocation.');
							break;
						case error.POSITION_UNAVAILABLE:
							reject('Location information is unavailable.');
							break;
						case error.TIMEOUT:
							reject('The request to get user location timed out.');
							break;
						default:
							reject('An unknown error occurred.');
							break;
					}
				}
			);
		} else {
			reject('Geolocation is not supported by this browser.');
		}
	});
}

export function formatAddress(address) {
	if (address) {
		const words = address.split(' ');
		if (words.length > 1) {
			return words[0] + ' ...';
		} else {
			return words[0];
		}
	} else {
		return 'Set location';
	}
}

export function deleteOverlappingSlotsForWashers(washers, filledSlots, targetWeekday, serviceTime) {
	// Create a deep copy of washers to avoid modifying the original array
	const updatedWashers = structuredClone(washers);

	// Iterate over each washer in the array
	for (const washer of washers) {
		// Check if the target weekday exists in the workHours object of the current washer
		if (!washer.workHours.hasOwnProperty(targetWeekday)) continue;
		const targetDay = washer.workHours[targetWeekday];

		// Iterate over the batches (batchOne, batchTwo, etc.) in the target weekday
		for (const batch in targetDay) {
			// Filter out slots that cannot accommodate the service time
			const filteredSlots = targetDay[batch].filter((originalSlot) => {
				// Check for overlap with filled slots
				const overlaps = filledSlots.some((filledSlot) => {
					const filledStart = filledSlot.slot.start;
					const filledEnd = filledSlot.slot.end;
					const originalStart = originalSlot.start;
					const originalEnd = originalSlot.end;

					return (
						(filledStart >= originalStart && filledStart < originalEnd) ||
						(filledEnd > originalStart && filledEnd <= originalEnd) ||
						(filledStart <= originalStart && filledEnd >= originalEnd)
					);
				});

				// If there is an overlap, split the original slot
				if (overlaps) {
					const splitSlots = [];

					filledSlots.forEach((filledSlot) => {
						const filledStart = filledSlot.slot.start;
						const filledEnd = filledSlot.slot.end;

						// Check for overlap with the original slot
						if (
							(filledStart >= originalSlot.start && filledStart < originalSlot.end) ||
							(filledEnd > originalSlot.start && filledEnd <= originalSlot.end) ||
							(filledStart <= originalSlot.start && filledEnd >= originalSlot.end)
						) {
							// Split the original slot based on the filled slot
							if (filledStart > originalSlot.start) {
								splitSlots.push({ start: originalSlot.start, end: filledStart });
							}

							if (filledEnd < originalSlot.end) {
								splitSlots.push({ start: filledEnd, end: originalSlot.end });
							}
						}
					});

					return splitSlots;
				}

				// If there is no overlap and the slot can accommodate the service time, keep it
				return (
					(new Date('1970-01-01T' + originalSlot.end + 'Z') -
						new Date('1970-01-01T' + originalSlot.start + 'Z')) /
						(1000 * 60) >=
					serviceTime
				);
			});

			// Update the original targetDay object with the modified array
			targetDay[batch] = filteredSlots;
		}
	}

	return updatedWashers;
}

function timeStringToMinutes(timeStr) {
	const [hour, minute] = timeStr.split(':');
	return +hour * 60 + +minute;
}

function checkOverlap(filledSlot, originalSlot) {
	const filledStart = timeStringToMinutes(filledSlot.slot.start);
	const filledEnd = timeStringToMinutes(filledSlot.slot.end);
	const originalStart = timeStringToMinutes(originalSlot.start);
	const originalEnd = timeStringToMinutes(originalSlot.end);

	return (
		(filledStart >= originalStart && filledStart < originalEnd) ||
		(filledEnd > originalStart && filledEnd <= originalEnd) ||
		(filledStart <= originalStart && filledEnd >= originalEnd)
	);
}

function splitSlots(originalSlots, filledSlots) {
	let retval = structuredClone(originalSlots);

	for (const filledSlot of filledSlots) {
		const filledStart = timeStringToMinutes(filledSlot.slot.start); // slot: { start: '11:00', end: '12:00' }, slot: { start: '08:00', end: '09:00' },
		const filledEnd = timeStringToMinutes(filledSlot.slot.end);
		retval = retval.flatMap((originalSlot) => {
			const hasOverlap = checkOverlap(filledSlot, originalSlot);
			if (!hasOverlap) return originalSlot;
			const originalStart = timeStringToMinutes(originalSlot.start);
			const originalEnd = timeStringToMinutes(originalSlot.end);

			// if exactly same remove the slot
			if (filledStart === originalStart && filledEnd === originalEnd) return [];

			// if filled slot is in b/w original slot, remove filled slot chunk
			if (filledStart >= originalStart && filledEnd <= originalEnd)
				return [
					{
						start: originalSlot.start,
						end: filledSlot.slot.start
					},
					{
						start: filledSlot.slot.end,
						end: originalSlot.end
					}
				];

			// if filled slot starts is in b/w original slot, but ends after it
			if (filledStart >= originalStart && filledEnd >= originalEnd)
				return [
					{
						start: originalSlot.start,
						end: filledSlot.slot.start
					}
				];
			// if filled slot starts before original slot, but ends inside it
			if (filledStart <= originalStart && filledEnd <= originalEnd)
				return [
					{
						end: originalSlot.end,
						start: filledSlot.slot.end
					}
				];
		});
	}
	return retval;
}

export function splitTimeSlots(workers, targetWeekday, serviceTimeInMinutes) {
	const result = [];
  
	workers.forEach(worker => {
	  const workerId = worker.id;
	  const workerNum = worker.contact;
	  const workerWorkHours = worker.workHours[targetWeekday];
  
	  if (workerWorkHours) {
		Object.keys(workerWorkHours).forEach(batchKey => {
		  const batch = workerWorkHours[batchKey];
  
		  batch.forEach(timeRange => {
			const { start, end } = timeRange;
			const startTime = new Date(`2023-01-01T${start}`);
			const endTime = new Date(`2023-01-01T${end}`);
  
			while (startTime.getTime() + serviceTimeInMinutes * 60 * 1000 <= endTime.getTime()) {
			  const slotEnd = new Date(startTime.getTime() + serviceTimeInMinutes * 60 * 1000);
			  const newSlot = {
				id: workerId,
				contact: workerNum,
				slot: {
				  start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
				  end: slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
				}
			  };
  
			  // Check if a similar slot already exists in the result array
			  const similarSlotIndex = result.findIndex(existingSlot =>
				areSlotsEqual(existingSlot.slot, newSlot.slot)
			  );
  
			  if (similarSlotIndex === -1) {
				result.push(newSlot);
			  } else {
				// If a similar slot exists, randomly choose one
				if (Math.random() < 0.5) {
				  result[similarSlotIndex] = newSlot;
				}
			  }
  
			  startTime.setTime(slotEnd.getTime());
			}
		  });
		});
	  }
	});
  
	return result;
  }
  
  // Helper function to check if two slots are equal
  function areSlotsEqual(slot1, slot2) {
	return slot1.start === slot2.start && slot1.end === slot2.end;
  }
  

// export function splitTimeSlots(workers, targetWeekday, serviceTimeInMinutes) {
// 	const result = [];
  
// 	workers.forEach(worker => {
// 		const workerId = worker.id;
// 		const workerNum = worker.contact;
// 	  const workerWorkHours = worker.workHours[targetWeekday];
  
// 	  if (workerWorkHours) {
// 		Object.keys(workerWorkHours).forEach(batchKey => {
// 		  const batch = workerWorkHours[batchKey];
  
// 		  batch.forEach(timeRange => {
// 			const { start, end } = timeRange;
// 			const startTime = new Date(`2023-01-01T${start}`);
// 			const endTime = new Date(`2023-01-01T${end}`);
  
// 			while (startTime.getTime() + serviceTimeInMinutes * 60 * 1000 <= endTime.getTime()) {
// 			  const slotEnd = new Date(startTime.getTime() + serviceTimeInMinutes * 60 * 1000);
// 			  const newSlot = {
// 				  id: workerId,
// 				  contact: workerNum,
// 				slot: {
// 				  start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// 				  end: slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// 				}
// 			  };
  
// 			  // Check if a similar slot already exists in the result array
// 			  const similarSlotIndex = result.findIndex(existingSlot =>
// 				areSlotsEqual(existingSlot.slot, newSlot.slot)
// 			  );
  
// 			  if (similarSlotIndex === -1) {
// 				result.push(newSlot);
// 			  } else {
// 				// If a similar slot exists, randomly choose one
// 				if (Math.random() < 0.5) {
// 				  result[similarSlotIndex] = newSlot;
// 				}
// 			  }
  
// 			  startTime.setTime(slotEnd.getTime());
// 			}
// 		  });
// 		});
// 	  }
// 	});
  
// 	return result;
//   }
  
//   // Helper function to check if two slots are equal
//   function areSlotsEqual(slot1, slot2) {
// 	return slot1.start === slot2.start && slot1.end === slot2.end;
//   }
  
  export function textDateToUTC(inputDate) {
    const dateObject = new Date(inputDate);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = '12';
    const minutes = '00';
    const seconds = '00';

    const customFormatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return customFormatDate;
}
  
// utils.js

export function deleteOverlappingSlotsForWashers2(
    washers,
    filledSlots,
    targetWeekday,
    serviceTime
) {
    const updatedWashers = structuredClone(washers);

    for (const washer of updatedWashers) {
        // Check if the target weekday exists in the workHours object of the current washer
        if (!washer.workHours.hasOwnProperty(targetWeekday)) continue;

        const targetDay = washer.workHours[targetWeekday];

        // Filter filledSlots for the current washer
        const washerFilledSlots = filledSlots.filter(slot => slot.washerId === washer.id);

        // Iterate over the batches (batchOne, batchTwo, etc.) in the target weekday
        for (const batch in targetDay) {
            targetDay[batch] = splitSlots(targetDay[batch], washerFilledSlots)
                // Filter out slots that cannot accommodate the service time
                .filter(
                    (slot) =>
                        (new Date('1970-01-01T' + slot.end + 'Z') -
                            new Date('1970-01-01T' + slot.start + 'Z')) /
                        (1000 * 60) >=
                        serviceTime
                );
        }
    }

    return updatedWashers;
}


export function calculatePrice(carSize, serviceType) {
	const basePrices = {
		compact: {
			interior: 350,
			exterior: 250,
			fullBody: 575
		},
		midsize: {
			interior: 350 * 1.15,
			exterior: 250 * 1.15,
			fullBody: 575 * 1.15
		},
		fullsize: {
			interior: 350 * 1.3,
			exterior: 250 * 1.3,
			fullBody: 575 * 1.3
		},
		hatchback: {
			interior: 350 * 1.1,
			exterior: 250 * 1.1,
			fullBody: 575 * 1.1
		},
		sedan: {
			interior: 350 * 1.2,
			exterior: 250 * 1.2,
			fullBody: 575 * 1.2
		},
		suv: {
			interior: 350 * 1.25,
			exterior: 250 * 1.25,
			fullBody: 575 * 1.25
		},
		muv: {
			interior: 350 * 1.35,
			exterior: 250 * 1.35,
			fullBody: 575 * 1.35
		}
	};

	const sizePrices = basePrices[carSize];

	if (!sizePrices) {
		return 'Unknown';
	}

	const price = sizePrices[serviceType];

	if (price) {
		// Round to the nearest multiple of 5
		return `₹${(Math.round(price / 5) * 5).toFixed(0)}`;
	} else {
		return 'Unknown';
	}
}

export function calculateTime(carSize, serviceType) {
	// Define base times for different car sizes and service types
	const baseTimes = {
		compact: {
			interior: { timeTaken: 60, slotTaken: 90 },
			exterior: { timeTaken: 60, slotTaken: 90 },
			fullBody: { timeTaken: 120, slotTaken: 150 }
		},
		midsize: {
			interior: { timeTaken: 60, slotTaken: 90 },
			exterior: { timeTaken: 60, slotTaken: 90 },
			fullBody: { timeTaken: 120, slotTaken: 150 }
		},
		fullsize: {
			interior: { timeTaken: 90, slotTaken: 120 },
			exterior: { timeTaken: 60, slotTaken: 90 },
			fullBody: { timeTaken: 150, slotTaken: 180 }
		},
		hatchback: {
			interior: { timeTaken: 60, slotTaken: 90 },
			exterior: { timeTaken: 60, slotTaken: 90 },
			fullBody: { timeTaken: 120, slotTaken: 150 }
		},
		sedan: {
			interior: { timeTaken: 90, slotTaken: 120 },
			exterior: { timeTaken: 60, slotTaken: 90 },
			fullBody: { timeTaken: 150, slotTaken: 180 }
		},
		suv: {
			interior: { timeTaken: 120, slotTaken: 150 },
			exterior: { timeTaken: 60, slotTaken: 90 },
			fullBody: { timeTaken: 180, slotTaken: 210 }
		},
		muv: {
			interior: { timeTaken: 120, slotTaken: 150 },
			exterior: { timeTaken: 60, slotTaken: 90 },
			fullBody: { timeTaken: 180, slotTaken: 210 }
		}
	};

	// Get the base times for the specified car size
	const sizeTimes = baseTimes[carSize];

	// Check if the specified car size is valid
	if (!sizeTimes) {
		return { timeTaken: 'Unknown', slotTaken: 'Unknown' };
	}

	// Get the times for the specified service type
	const times = sizeTimes[serviceType];

	// Check if the specified service type is valid
	if (times) {
		return times;
	} else {
		return { timeTaken: 'Unknown', slotTaken: 'Unknown' };
	}
}

export const currentDay = new Date();

export const getNextFourDays = () => {
	const dates = [];
	for (let i = 1; i <= 4; i++) {
		const nextDate = new Date();
		nextDate.setDate(currentDay.getDate() + i);
		dates.push(nextDate);
	}
	return dates;
};

export function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getDistance(lat1, lon1, lat2, lon2) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in km
	return distance;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

export function formatDate2(inputDate) {
	// Parse the input date string into a Date object
	const dateObject = new Date(inputDate);

	// Extract year, month, and day components
	const year = dateObject.getFullYear();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
	const day = dateObject.getDate().toString().padStart(2, '0');

	// Format the result as "YYYY-MM-DD"
	const formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}

// api.js

//stores

import { writable } from 'svelte/store';

export const currentCar = writable('Select Car'); // Initialize with an empty string or the default car value
export const currentCarSize = writable('compact'); // Initialize with an empty string or the default car value
export const currentLocation = writable('Address');
export const currentCoords = writable({ lat: 0.0, lng: 0.0 });

//datasets

export let carsData = writable({
	compact: ['Alto', 'Celerio', 'Dzire', 'S-Presso', 'Brezza', 'Swift', 'Wagon-R'],
	midsize: ['Baleno', 'Ciaz', 'Ertiga', 'Ignis', 'S-Cross', 'XL6', 'Swift'],
	fullsize: ['Eeco', 'Grand Vitara', 'Jimny', 'Baleno'],
	hatch: [
		'Grand i10',
		'i20',
		'Santro',
		'Altroz',
		'Tiago',
		'Kwid',
		'Polo',
		'Glanza',
		'Camry',
		'G3',
		'C3'
	],
	sedan: [
		'Elantra',
		'Verna',
		'Tigor',
		'Amaze',
		'City',
		'Jazz',
		'City Hybrid',
		'Octavia',
		'Rapid',
		'C5 Aircross'
	],
	suv: [
		'Creta',
		'Tucson',
		'Venue',
		'Kona Electric',
		'Harrier',
		'Nexon',
		'WR-V',
		'Duster',
		'Kiger',
		'Tiguan',
		'T-ROC',
		'Taigun',
		'Astor',
		'Compass',
		'Meridian',
		'Kicks',
		'Magnite',
		'C3',
		'Tucson'
	],
	muv: [
		'Ertiga',
		'XL6',
		'Carnival',
		'Sonet',
		'Gloster',
		'Hector Plus',
		'Innova',
		'KUV 100',
		'XUV700',
		'XUV 300',
		'KUV100 Electric',
		'Kuv Electric',
		'Altroz EV',
		'Aura',
		'Alcazar',
		'Stargazer',
		'New Tucson',
		'Safari',
		'Punch',
		'Nexon EV',
		'Nexon EV Max',
		'Hilux',
		'Rumion',
		'New Hyryder'
	]
});
