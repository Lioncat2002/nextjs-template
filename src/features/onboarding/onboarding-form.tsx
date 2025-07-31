"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Progress } from "@/src/shared/ui/progress";
import { Textarea } from "@/src/shared/ui/textarea";

import {
	ArrowRight,
	Building2,
	Check,
	Globe,
	Mail,
	MapPin,
	Phone,
} from "lucide-react";

type CompanyFormData = {
	name: string;
	description: string | null;
	email: string | null;
	phoneNumber: string | null;
	website: string | null;
	location: string | null;
	logo: string | null;
	photoURL: string | null;
};

const questions = [
	{
		id: "name",
		title: "What's the name of your company?",
		subtitle: "This will be displayed on your profile",
		type: "text",
		placeholder: "Enter your company name",
		required: true,
		icon: Building2,
	},
	{
		id: "description",
		title: "Tell us about your company",
		subtitle: "What does your company do? Keep it brief.",
		type: "textarea",
		placeholder: "We help businesses...",
		required: false,
		icon: Building2,
	},
	{
		id: "email",
		title: "What's your company email?",
		subtitle: "We'll use this for important updates",
		type: "email",
		placeholder: "company@example.com",
		required: false,
		icon: Mail,
	},
	{
		id: "phoneNumber",
		title: "Company phone number",
		subtitle: "Optional - for customer support",
		type: "tel",
		placeholder: "+1 (555) 123-4567",
		required: false,
		icon: Phone,
	},
	{
		id: "website",
		title: "Do you have a website?",
		subtitle: "Share your company's online presence",
		type: "url",
		placeholder: "https://www.example.com",
		required: false,
		icon: Globe,
	},
	{
		id: "location",
		title: "Where is your company located?",
		subtitle: "City, state, or country",
		type: "text",
		placeholder: "San Francisco, CA",
		required: false,
		icon: MapPin,
	},
];

/* TODO REFACTOR TO USE ZOD AND BE MORE REUSABLE, WILL PASS IN STEPWISE METADATA AND FORM SCHEMA TO AGGREGATE DATA IN A CENTRAL HOOK */

export function OnboardingForm() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [formData, setFormData] = useState<CompanyFormData>({
		name: "",
		description: null,
		email: null,
		phoneNumber: null,
		website: null,
		location: null,
		logo: null,
		photoURL: null,
	});
	const [inputValue, setInputValue] = useState("");

	const totalQuestions = questions.length;
	const progress = ((currentQuestion + 1) / totalQuestions) * 100;
	const currentQ = questions[currentQuestion];
	const IconComponent = currentQ.icon;

	useEffect(() => {
		// Load current value when question changes
		const currentValue = formData[currentQ.id as keyof CompanyFormData];
		setInputValue(currentValue || "");
	}, [currentQuestion, currentQ.id, formData]);

	const canProceed = () => {
		if (currentQ.required) {
			return inputValue.trim() !== "";
		}
		return true;
	};

	const handleNext = () => {
		// Save current answer
		setFormData((prev) => ({
			...prev,
			[currentQ.id]: inputValue || null,
		}));

		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		const finalData = {
			...formData,
			[currentQ.id]: inputValue || null,
		};
		console.log("Company data:", finalData);
		// submit logic here
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (canProceed()) {
				handleNext();
			}
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* Top progress bar */}
			<div className="fixed top-0 left-0 right-0 z-10">
				<Progress value={progress} className="h-1 rounded-none" />
			</div>

			{/* Main section: question + action */}
			<div className="flex-1 flex flex-col justify-center p-8 pt-16 overflow-hidden">
				{/* Question content */}
				<div
					key={currentQ.id}
					className="w-full max-w-2xl mx-auto transition-all duration-500 ease-in-out transform animate-slide-in"
				>
					{/* Question count */}
					<div className="mb-8">
						<span className="text-sm font-medium text-muted-foreground">
							{currentQuestion + 1} → {totalQuestions}
						</span>
					</div>

					{/* Title & subtitle */}
					<div className="mb-12">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center">
								<IconComponent className="w-6 h-6" />
							</div>
							<div>
								<h1 className="text-3xl md:text-4xl font-bold leading-tight">
									{currentQ.title}
								</h1>
								{currentQ.subtitle && (
									<p className="text-lg text-muted-foreground mt-2">
										{currentQ.subtitle}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Input field */}
					<div className="mb-12">
						{currentQ.type === "textarea" ? (
							<Textarea
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyPress}
								placeholder={currentQ.placeholder}
								className="text-xl p-6 min-h-[120px] resize-none border-2 focus:border-primary"
								autoFocus
							/>
						) : (
							<Input
								type={currentQ.type}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyPress}
								placeholder={currentQ.placeholder}
								className="text-xl p-6 h-16 border-2 focus:border-primary"
								autoFocus
							/>
						)}
					</div>
				</div>

				{/* Button bar */}
				<div className="w-full max-w-2xl mx-auto">
					<div className="flex items-center justify-between">
						<div className="text-sm text-muted-foreground">
							Press{" "}
							<kbd className="px-2 py-1 bg-muted rounded text-xs">Enter ↵</kbd>{" "}
							to continue
						</div>

						{/* <Button
							onClick={handleNext}
							disabled={!canProceed()}
							size="lg"
							className="px-8"
						>
							{currentQuestion === totalQuestions - 1 ? (
								<>
									<Check className="w-4 h-4 mr-2" />
									Create Company
								</>
							) : (
								<>
									OK
									<ArrowRight className="w-4 h-4 ml-2" />
								</>
							)}
						</Button> */}
					</div>
				</div>
			</div>

			{currentQuestion > 0 && (
				<div className="fixed bottom-8 left-8">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setCurrentQuestion(currentQuestion - 1)}
						className="text-muted-foreground"
					>
						← Previous
					</Button>
				</div>
			)}
		</div>
	);
}
