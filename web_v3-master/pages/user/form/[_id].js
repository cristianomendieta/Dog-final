import { useUserStore } from "../../../src/modules/user/stores/user.store";
import { useRouter } from "next/router";
import Navigator from "../../../src/modules/navigator/templates/Navigator";
import UserForm from "../../../src/modules/user/form/templates/UserForm";

export default () => {
    const router = useRouter();
    const { edit } = useUserStore();

    edit(router.query._id);

    return (
        <>
            <Navigator />
            <UserForm />
        </>
    );
}