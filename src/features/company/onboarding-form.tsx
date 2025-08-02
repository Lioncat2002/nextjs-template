"use client";

import type React from "react";
import { useEffect } from "react";

import { Button } from "@/src/shared/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";
import { Progress } from "@/src/shared/ui/progress";
import { Textarea } from "@/src/shared/ui/textarea";

import {
	type CreateCompany,
	CreateCompanySchema,
} from "@/src/entities/organization/schema";
import {
	type MultiStepConfig,
	useMultiStepForm,
} from "@/src/shared/ui/hooks/use-multistep";
import { WaveLoader } from "@/src/shared/ui/wave-loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import { useCreateCompany } from "./use-create-company";

const stepConfig: MultiStepConfig<CreateCompany> = {
	steps: [
		{
			metadata: {
				id: "name",
				title: "What's the name of your company?",
				subtitle: "This will be displayed on your profile",
				icon: Building2,
			},
			schema: CreateCompanySchema.pick({ name: true }),
			defaultValues: { name: "" },
		},
		{
			metadata: {
				id: "description",
				title: "Tell us about your company",
				subtitle: "What does your company do? Keep it brief.",
				icon: Building2,
			},
			schema: CreateCompanySchema.pick({ description: true }),
			defaultValues: { description: "" },
		},
		{
			metadata: {
				id: "email",
				title: "What's your company email?",
				subtitle: "We'll use this for important updates",
				icon: Mail,
			},
			schema: CreateCompanySchema.pick({ email: true }),
			defaultValues: { email: "" },
		},
		{
			metadata: {
				id: "phoneNumber",
				title: "Company phone number",
				subtitle: "Optional - for customer support",
				icon: Phone,
			},
			schema: CreateCompanySchema.pick({ phoneNumber: true }),
			defaultValues: { phoneNumber: "" },
		},
		{
			metadata: {
				id: "website",
				title: "Do you have a website?",
				subtitle: "Share your company's online presence",
				icon: Globe,
			},
			schema: CreateCompanySchema.pick({ website: true }),
			defaultValues: { website: "" },
		},
		{
			metadata: {
				id: "location",
				title: "Where is your company located?",
				subtitle: "City, state, or country",
				icon: MapPin,
			},
			schema: CreateCompanySchema.pick({ location: true }),
			defaultValues: { location: "" },
		},
	],
};

type StepProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	stepData: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	updateStepData: (stepId: string, data: any) => void;
	onKeyPress: (e: React.KeyboardEvent) => void;
	stepIndex: number;
	updateStepValidity: (stepIndex: number, isValid: boolean) => void;
	currentStepSchema: z.ZodTypeAny;
};

const NameStep = ({
	stepData,
	updateStepData,
	updateStepValidity,
	stepIndex,
	onKeyPress,
	currentStepSchema,
}: StepProps) => {
	const form = useForm({
		defaultValues: stepData,
		resolver: zodResolver(currentStepSchema),
		mode: "onChange",
	});

	const { control, formState } = form;
	const values = useWatch({ control });

	useEffect(() => {
		updateStepData("name", values);
		updateStepValidity(stepIndex, formState.isValid);
	}, [
		values,
		formState.isValid,
		updateStepData,
		updateStepValidity,
		stepIndex,
	]);

	return (
		<Form {...form}>
			<FormField
				control={control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								placeholder="Enter your company name"
								className="text-xl p-6 h-16 border-2 focus:border-primary"
								onKeyDown={onKeyPress}
								autoFocus
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
};

const DescriptionStep = ({
	stepData,
	updateStepData,
	updateStepValidity,
	stepIndex,
	onKeyPress,
	currentStepSchema,
}: StepProps) => {
	const form = useForm({
		defaultValues: stepData,
		resolver: zodResolver(currentStepSchema),
		mode: "onChange",
	});

	const { control, formState } = form;
	const values = useWatch({ control });

	useEffect(() => {
		updateStepData("description", values);
		updateStepValidity(stepIndex, formState.isValid);
	}, [
		values,
		formState.isValid,
		updateStepData,
		updateStepValidity,
		stepIndex,
	]);

	return (
		<Form {...form}>
			<FormField
				control={control}
				name="description"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Textarea
								{...field}
								placeholder="We help businesses..."
								className="text-xl p-6 min-h-[120px] resize-none border-2 focus:border-primary"
								onKeyDown={onKeyPress}
								autoFocus
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
};

const EmailStep = ({
	stepData,
	updateStepData,
	updateStepValidity,
	stepIndex,
	onKeyPress,
	currentStepSchema,
}: StepProps) => {
	const form = useForm({
		defaultValues: stepData,
		resolver: zodResolver(currentStepSchema),
		mode: "onChange",
	});

	const { control, formState } = form;
	const values = useWatch({ control });

	useEffect(() => {
		updateStepData("email", values);
		updateStepValidity(stepIndex, formState.isValid);
	}, [
		values,
		formState.isValid,
		updateStepData,
		updateStepValidity,
		stepIndex,
	]);

	return (
		<Form {...form}>
			<FormField
				control={control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								type="email"
								placeholder="company@example.com"
								className="text-xl p-6 h-16 border-2 focus:border-primary"
								onKeyDown={onKeyPress}
								autoFocus
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
};

const PhoneStep = ({
	stepData,
	updateStepData,
	updateStepValidity,
	stepIndex,
	onKeyPress,
	currentStepSchema,
}: StepProps) => {
	const form = useForm({
		defaultValues: stepData,
		resolver: zodResolver(currentStepSchema),
		mode: "onChange",
	});

	const { control, formState } = form;
	const values = useWatch({ control });

	useEffect(() => {
		updateStepData("phoneNumber", values);
		updateStepValidity(stepIndex, formState.isValid);
	}, [
		values,
		formState.isValid,
		updateStepData,
		updateStepValidity,
		stepIndex,
	]);

	return (
		<Form {...form}>
			<FormField
				control={control}
				name="phoneNumber"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								type="tel"
								placeholder="+1 (555) 123-4567"
								className="text-xl p-6 h-16 border-2 focus:border-primary"
								onKeyDown={onKeyPress}
								autoFocus
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
};

const WebsiteStep = ({
	stepData,
	updateStepData,
	updateStepValidity,
	stepIndex,
	onKeyPress,
	currentStepSchema,
}: StepProps) => {
	const form = useForm({
		defaultValues: stepData,
		resolver: zodResolver(currentStepSchema),
		mode: "onChange",
	});

	const { control, formState } = form;
	const values = useWatch({ control });

	useEffect(() => {
		updateStepData("website", values);
		updateStepValidity(stepIndex, formState.isValid);
	}, [
		values,
		formState.isValid,
		updateStepData,
		updateStepValidity,
		stepIndex,
	]);

	return (
		<Form {...form}>
			<FormField
				control={control}
				name="website"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								type="url"
								placeholder="https://www.example.com"
								className="text-xl p-6 h-16 border-2 focus:border-primary"
								onKeyDown={onKeyPress}
								autoFocus
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
};

const LocationStep = ({
	stepData,
	updateStepData,
	updateStepValidity,
	stepIndex,
	onKeyPress,
	currentStepSchema,
}: StepProps) => {
	const form = useForm({
		defaultValues: stepData,
		resolver: zodResolver(currentStepSchema),
		mode: "onChange",
	});

	const { control, formState } = form;
	const values = useWatch({ control });

	useEffect(() => {
		updateStepData("location", values);
		updateStepValidity(stepIndex, formState.isValid);
	}, [
		values,
		formState.isValid,
		updateStepData,
		updateStepValidity,
		stepIndex,
	]);

	return (
		<Form {...form}>
			<FormField
				control={control}
				name="location"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								type="text"
								placeholder="San Francisco, CA"
								className="text-xl p-6 h-16 border-2 focus:border-primary"
								onKeyDown={onKeyPress}
								autoFocus
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
};

// ----------------------------
// Step Mapping & Form UI
// ----------------------------

const stepComponents = {
	name: NameStep,
	description: DescriptionStep,
	email: EmailStep,
	phoneNumber: PhoneStep,
	website: WebsiteStep,
	location: LocationStep,
};

export function OnboardingForm() {
	const { execute, isExecuting } = useCreateCompany();
	const {
		currentStep,
		totalSteps,
		progress,
		currentStepMetadata,
		stepData,
		updateStepData,
		updateStepValidity,
		next,
		prev,
		canProceed,
		canSubmit,
		submit,
		isFirstStep,
		isLastStep,
		currentStepSchema,
	} = useMultiStepForm<CreateCompany>({ ...stepConfig, onSubmit: execute });

	const IconComponent = currentStepMetadata.icon;
	const StepComponent =
		stepComponents[currentStepMetadata.id as keyof typeof stepComponents];

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (canProceed) {
				if (isLastStep && canSubmit) submit();
				else next();
			}
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<div className="fixed top-0 left-0 right-0 z-10">
				<Progress value={progress} className="h-1 rounded-none" />
			</div>

			<div className="flex-1 flex flex-col justify-center p-8 pt-16 overflow-hidden">
				<div
					key={currentStepMetadata.id}
					className="w-full max-w-2xl mx-auto transition-all animate-slide-in"
				>
					<div className="mb-8">
						<span className="text-sm font-medium text-muted-foreground">
							{currentStep + 1} → {totalSteps}
						</span>
					</div>
					<div className="mb-12">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center">
								{IconComponent && <IconComponent className="w-6 h-6" />}
							</div>
							<div>
								<h1 className="text-3xl md:text-4xl font-bold leading-tight">
									{currentStepMetadata.title}
								</h1>
								{currentStepMetadata.subtitle && (
									<p className="text-lg text-muted-foreground mt-2">
										{currentStepMetadata.subtitle}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="mb-12">
						{StepComponent && (
							<StepComponent
								stepData={stepData[currentStepMetadata.id] || {}}
								updateStepData={updateStepData}
								onKeyPress={handleKeyPress}
								updateStepValidity={updateStepValidity}
								stepIndex={currentStep}
								currentStepSchema={currentStepSchema}
							/>
						)}
					</div>
				</div>

				<div className="w-full max-w-2xl mx-auto">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						Press{" "}
						<kbd className="px-2 py-1 bg-muted rounded text-xs">Enter ↵</kbd> to
						continue
					</div>
				</div>
			</div>

			{!isFirstStep && (
				<div className="fixed bottom-8 left-8">
					<Button
						variant="ghost"
						size="sm"
						onClick={prev}
						className="text-muted-foreground"
					>
						← Previous
					</Button>
				</div>
			)}
			{isExecuting && (
				<div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center">
					<WaveLoader />
				</div>
			)}
		</div>
	);
}
