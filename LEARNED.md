## React Testing Library
- Render UI in a simulated browsers
- allow to interact just like user
- 3 IMPORTANT FUNCTIONS:
- Function	Purpose
render()	Renders a React component
screen	Finds elements on the rendered page
expect()	Checks whether something is correct

1. getByRole()
screen.getByRole('button', { name: 'Login' });


Finds an element based on its accessible role and name.

Examples:
screen.getByRole('button', { name: 'Login' });

screen.getByRole('heading', { name: 'Welcome' });

screen.getByRole('textbox', { name: 'Email' });

2. getByText()
screen.getByText('Welcome to our store');


Finds an element containing the specified text.

Useful for:
- Product descriptions.
- Error messages.
- Notifications.
- Informational text.

3. getByLabelText()
screen.getByLabelText('Email');


Finds a form control associated with a label.

This is particularly useful for testing forms.

4. getByTestId()
screen.getByTestId('product-price');


Finds an element using a custom data-testid attribute.

Example:
<p data-testid="product-price">$29.99</p>


Use this when an element cannot be reliably identified through its accessible role, label, or text.

Don't make data-testid your default way of finding elements.

5. Understand the difference between getBy, queryBy, and findBy
This is particularly important.
Query	Behavior	When to use
getBy	Returns element or throws immediately	Element should exist
queryBy	Returns element or null	Checking absence
findBy	Returns a Promise	Element appears asynchronously