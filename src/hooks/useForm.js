import { useState, useCallback, useRef, useEffect } from 'react';
import { VALIDATION } from '../utils/constants';

/**
 * Modern form management hook with validation, async submission, and accessibility
 * @param {object} initialValues - Initial form values
 * @param {object} options - Configuration options
 * @returns {object} Form state and utilities
 */
export const useForm = (initialValues = {}, options = {}) => {
  const {
    validationSchema = {},
    onSubmit = () => {},
    validateOnChange = true,
    validateOnBlur = true,
    resetOnSubmit = false,
    enableReinitialize = false,
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [fieldOrder, setFieldOrder] = useState([]);

  const initialValuesRef = useRef(initialValues);
  const validationTimeouts = useRef({});

  // Reinitialize form when initial values change
  useEffect(() => {
    if (enableReinitialize && initialValues !== initialValuesRef.current) {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      initialValuesRef.current = initialValues;
    }
  }, [initialValues, enableReinitialize]);

  /**
   * Validate a single field
   */
  const validateField = useCallback(async (name, value) => {
    const fieldSchema = validationSchema[name];
    if (!fieldSchema) return null;

    try {
      if (typeof fieldSchema === 'function') {
        const result = await fieldSchema(value, values);
        return result === true ? null : result;
      }

      // Built-in validation rules
      if (fieldSchema.required && (!value || value.toString().trim() === '')) {
        return fieldSchema.requiredMessage || `${name} is required`;
      }

      if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
        return fieldSchema.minLengthMessage || `${name} must be at least ${fieldSchema.minLength} characters`;
      }

      if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
        return fieldSchema.maxLengthMessage || `${name} must be no more than ${fieldSchema.maxLength} characters`;
      }

      if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
        return fieldSchema.patternMessage || `${name} format is invalid`;
      }

      if (fieldSchema.email && !VALIDATION.EMAIL_REGEX.test(value)) {
        return fieldSchema.emailMessage || 'Please enter a valid email address';
      }

      if (fieldSchema.phone && !VALIDATION.PHONE_REGEX.test(value)) {
        return fieldSchema.phoneMessage || 'Please enter a valid phone number';
      }

      if (fieldSchema.min && parseFloat(value) < fieldSchema.min) {
        return fieldSchema.minMessage || `${name} must be at least ${fieldSchema.min}`;
      }

      if (fieldSchema.max && parseFloat(value) > fieldSchema.max) {
        return fieldSchema.maxMessage || `${name} must be no more than ${fieldSchema.max}`;
      }

      return null;
    } catch (error) {
      console.error(`Validation error for field ${name}:`, error);
      return 'Validation error occurred';
    }
  }, [validationSchema, values]);

  /**
   * Validate all fields
   */
  const validateForm = useCallback(async () => {
    setIsValidating(true);
    const newErrors = {};

    const validationPromises = Object.keys(validationSchema).map(async (name) => {
      const error = await validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
      }
    });

    await Promise.all(validationPromises);
    setErrors(newErrors);
    setIsValidating(false);

    return Object.keys(newErrors).length === 0;
  }, [validationSchema, validateField, values]);

  /**
   * Handle field value change
   */
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Add field to order if not already present
    setFieldOrder(prev => {
      if (!prev.includes(name)) {
        return [...prev, name];
      }
      return prev;
    });

    // Validate on change if enabled
    if (validateOnChange && validationSchema[name]) {
      // Clear existing timeout
      if (validationTimeouts.current[name]) {
        clearTimeout(validationTimeouts.current[name]);
      }

      // Debounce validation
      validationTimeouts.current[name] = setTimeout(async () => {
        const error = await validateField(name, value);
        setErrors(prev => ({
          ...prev,
          [name]: error,
        }));
      }, 300);
    }
  }, [validateOnChange, validationSchema, validateField]);

  /**
   * Handle field blur
   */
  const handleBlur = useCallback(async (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));

    if (validateOnBlur && validationSchema[name]) {
      const error = await validateField(name, values[name]);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  }, [validateOnBlur, validationSchema, validateField, values]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
    }

    setSubmitCount(prev => prev + 1);
    setIsSubmitting(true);

    try {
      // Mark all fields as touched
      const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      // Validate form
      const isValid = await validateForm();
      
      if (!isValid) {
        // Focus first error field
        const firstErrorField = fieldOrder.find(field => errors[field]);
        if (firstErrorField) {
          const element = document.querySelector(`[name="${firstErrorField}"]`);
          if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        return;
      }

      // Submit form
      await onSubmit(values, { setErrors, setValues });

      // Reset form if configured
      if (resetOnSubmit) {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setFieldOrder([]);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Handle server validation errors
      if (error.validationErrors) {
        setErrors(error.validationErrors);
      } else {
        setErrors({ submit: error.message || 'An error occurred during submission' });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [validationSchema, validateForm, onSubmit, values, resetOnSubmit, initialValues, fieldOrder, errors]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsValidating(false);
    setSubmitCount(0);
    setFieldOrder([]);

    // Clear validation timeouts
    Object.values(validationTimeouts.current).forEach(clearTimeout);
    validationTimeouts.current = {};
  }, [initialValues]);

  /**
   * Set field value programmatically
   */
  const setFieldValue = useCallback((name, value) => {
    handleChange(name, value);
  }, [handleChange]);

  /**
   * Set field error programmatically
   */
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  /**
   * Get field props for easy integration
   */
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: (e) => handleChange(name, e.target.value),
    onBlur: () => handleBlur(name),
    'aria-invalid': !!(errors[name] && touched[name]),
    'aria-describedby': errors[name] && touched[name] ? `${name}-error` : undefined,
  }), [values, handleChange, handleBlur, errors, touched]);

  /**
   * Get field error message
   */
  const getFieldError = useCallback((name) => {
    return touched[name] ? errors[name] : null;
  }, [errors, touched]);

  /**
   * Check if field has error
   */
  const hasFieldError = useCallback((name) => {
    return !!(errors[name] && touched[name]);
  }, [errors, touched]);

  /**
   * Check if form is valid
   */
  const isValid = Object.keys(errors).length === 0;

  /**
   * Check if form is dirty (has changes)
   */
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  /**
   * Get form props for easy integration
   */
  const getFormProps = useCallback(() => ({
    onSubmit: handleSubmit,
    noValidate: true,
  }), [handleSubmit]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(validationTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  return {
    // Values and state
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isValid,
    isDirty,
    submitCount,

    // Handlers
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm,
    validateField,

    // Utilities
    setFieldValue,
    setFieldError,
    getFieldProps,
    getFieldError,
    hasFieldError,
    getFormProps,
  };
};

/**
 * Hook for managing multi-step forms
 * @param {array} steps - Array of step configurations
 * @param {object} options - Configuration options
 * @returns {object} Multi-step form utilities
 */
export const useMultiStepForm = (steps, options = {}) => {
  const { onComplete = () => {} } = options;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepConfig = steps[currentStep];

  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  }, [steps.length]);

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  }, [isLastStep, currentStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  }, [isFirstStep]);

  const updateStepData = useCallback((step, data) => {
    setStepData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  }, []);

  const completeForm = useCallback(async () => {
    try {
      await onComplete(stepData);
      setCompletedSteps(prev => new Set([...prev, currentStep]));
    } catch (error) {
      console.error('Form completion error:', error);
      throw error;
    }
  }, [stepData, onComplete, currentStep]);

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setStepData({});
    setCompletedSteps(new Set());
  }, []);

  const getStepProgress = useCallback(() => {
    return ((currentStep + 1) / steps.length) * 100;
  }, [currentStep, steps.length]);

  return {
    currentStep,
    currentStepConfig,
    stepData,
    completedSteps,
    isFirstStep,
    isLastStep,
    progress: getStepProgress(),
    
    goToStep,
    nextStep,
    prevStep,
    updateStepData,
    completeForm,
    resetForm,
  };
};