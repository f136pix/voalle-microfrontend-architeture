import {useFormExampleViewController} from "./useFormExampleViewController.ts"
import {
    Button,
    LoadingBrand, Switch, TextField
} from "pgv-lib/ui/components"

import {DrawerContent, DrawerFooter} from "pgv-lib/ui/drawer"
import {Box, Stack, Typography} from "pgv-lib/ui/material"
import {Controller} from "react-hook-form"
import {useEffect} from "react";

export interface FormExampleViewState {
    id?: string | number
}

function FormExampleView({id}: FormExampleViewState) {
    const {getForm, onSubmit, closeDrawer, formId, t, loading} = useFormExampleViewController({id})

    const {
        control,
        register,
        handleSubmit,
        formState: {errors}
    } = getForm()

    useEffect(() => {
    }, [id])

    return (
        <>
            <DrawerContent>
                <Typography variant={"h6"}>Criar Forma de Contato</Typography>
                {loading && <LoadingBrand backgroundOpacity={0.5}></LoadingBrand>}
                <form id={formId} onSubmit={handleSubmit(onSubmit)} >
                    <Box mt={3}>
                        <TextField
                            fullWidth
                            label={t("examples.form.code.label")}
                            placeholder={t("examples.form.code.placeholder")}
                            size={"small"}
                            error={!!errors.code}
                            helperText={errors.code ? errors.code?.message : ""}
                            {...register("code")}
                            type="string"
                        />
                    </Box>
                    <Box mt={3}>
                        <TextField
                            fullWidth
                            label={t("examples.form.title.label")}
                            placeholder={t("examples.form.title.placeholder")}
                            size={"small"}
                            error={!!errors.title}
                            helperText={errors.title ? errors.title?.message : ""}
                            {...register("title")}
                            type="text"
                        />
                    </Box>
                    <Box mt={3}>
                        <TextField
                            fullWidth
                            label={t("examples.form.description.label")}
                            placeholder={t("examples.form.description.placeholder")}
                            size={"small"}
                            error={!!errors.description}
                            helperText={errors.description ? errors.description?.message : ""}
                            {...register("description")}
                            type="text"
                        />
                    </Box>
                    <Box mt={3}>
                        <Controller
                            control={control}
                            name={"active"}
                            render={({field: {onChange, value}}) => (
                                <Switch
                                    checked={value}
                                    onChange={onChange}
                                    size="medium"
                                    label={t("examples.form.active.label")}
                                />
                            )}
                        />
                    </Box>
                </form>
            </DrawerContent>
            <DrawerFooter>
                <Stack useFlexGap spacing={3} direction="row">
                    <Button
                        title={t("commn.label.close")}
                        variant="outlined"
                        color="error"
                        onClick={closeDrawer}
                    >
                        {t("common.label.close")}
                    </Button>
                    <Button
                        title="Criar form de contato"
                        color="primary"
                        variant="contained"
                        loading={loading}
                        type="submit"
                        form={formId}
                    >
                        Criar forma de contato
                    </Button>
                </Stack>
            </DrawerFooter>
        </>
    )
}

export default FormExampleView